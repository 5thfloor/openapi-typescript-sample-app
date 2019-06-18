import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as SwaggerParser from 'swagger-parser';
import { Validator } from 'jsonschema';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/books (GET)', async () => {
    const parser = new SwaggerParser();
    const spec = await parser.dereference(path.resolve(__dirname, '../../openapi.yaml'));
    const schema = spec.paths['/books'].get.responses['200'].content['application/json'].schema;
    const validator = new Validator();

    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(({ body }) => {
        const result = validator.validate(body, schema);
        if (!result.valid) {
          throw new Error(result.errors.toString());
        }
      });
  });
});

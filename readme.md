## How to run
```bash
git clone https://github.com/esynergy/crud-api.git
npm install
```

### Run Locally (No Docker)
```bash
npm run dev
curl http://localhost:3000/api/v1/documents
```

### Run with Docker
```bash
docker-compose up
curl http://localhost:3000/api/v1/documents
```

## Testing the API

### Health Check
```bash
curl http://localhost:3000/health
```

### List Documents
```bash
curl http://localhost:3000/api/v1/documents
```

### Create Document
```bash
curl -X POST http://localhost:3000/api/v1/documents/create \
  -H "Content-Type: application/json" \
  -d '{"document_name":"Test document","field_count":3,"form_values":[{"field_seq":10,"is_mandatory":1,"field_type":1,"field_name":"Name","select_values":null},{"field_seq":20,"is_mandatory":1,"field_type":2,"field_name":"Gender","select_values":[{"value":"male","label":"Male"},{"value":"female","label":"Female"}]},{"field_seq":30,"is_mandatory":0,"field_type":3,"field_name":"Age","select_values":null}]}'
```

### Get Document
```bash
curl http://localhost:3000/api/v1/document/1
```

### Update Document
```bash
curl -X PUT http://localhost:3000/api/v1/documents/1 \
  -H "Content-Type: application/json" \
  -d '{"document_name":"Test document updated","field_count":3,"form_values":[{"field_seq":10,"is_mandatory":1,"field_type":1,"field_name":"Name","select_values":null},{"field_seq":20,"is_mandatory":1,"field_type":2,"field_name":"Gender","select_values":[{"value":"male","label":"Male"},{"value":"female","label":"Female"}]},{"field_seq":30,"is_mandatory":1,"field_type":3,"field_name":"Age","select_values":null}]}'
```

### Delete Document
```bash
curl -X DELETE http://localhost:3000/api/v1/documents/1

```


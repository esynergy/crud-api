## How to run
```bash
git clone repo
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
  -d '{"document_name":"Test","form_values":[]}'
```

### Get Document
```bash
curl http://localhost:3000/api/v1/document/1
```

### Update Document
```bash
curl -X PUT http://localhost:3000/api/v1/documents/1 \
  -H "Content-Type: application/json" \
  -d '{"document_name":"Updated"}'
```

### Delete Document
```bash
curl -X DELETE http://localhost:3000/api/v1/documents/1
```
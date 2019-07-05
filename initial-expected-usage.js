const validator = new Validator('http://example.com/swagger.yaml')
await validator.init()

validator.validate('UserCreated', payload)

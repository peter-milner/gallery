# gallery

### Installation
1. Create your own .env:
- `cp .env.sample .env`
- Fill in the consumer key

2. Create your own docker-compose.yml:
- `cp docker-compose.yml.sample docker-compose.yml`
- Fill in local path to your /src folder

3. Build:
`docker-compose build`

4. Run:
`docker-compose up`
The application should be up on `localhost:5000`

5. Add pre-commit.sh to your git hooks (Optional)

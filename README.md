# Recipe Book Monorepo

## Architecture
- Turborepo for monorepo (with Yarn workspace under the hood)
- TSDX for creating shared packages, like `ui`
- React + TypeScript
  - Tailwind
  - Storybook (for `ui` library)
  - end-to-end tests with Cypress
  - unit/integration tests with React Testing Library
- Python3 + Django for API
- auto-generated API client based on OpenAPI spec
- Kubernetes
- GitHub Actions for continuous integration
- Flux for continuous deployment
- Auth0 for authentication

TODO:
- use Storybook for `ui` package
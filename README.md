# TheCircle Client

## Environment Variables
* `API`(config: `https://localhost:8080`)

## Folder Structure
```
.
├── e2e
|   ├── src
|   |   ├── app.e2e-spec.ts
|   |   └── app.po.ts
│   ├── protactor.conf.js
│   └── tsconfig.e2e.json
├── src
|   ├── app
|   |   ├── components
|   |   |   └── example
|   |   |       ├── example.component.html
|   |   |       ├── example.component.scss
|   |   |       ├── example.component.spec.ts
|   |   |       └── example.component.ts
|   |   ├── services
|   |   |   └── example
|   |   |       ├── example.service.spec.ts
|   |   |       └── example.service.ts
|   |   ├── guards
|   |   |   └── example
|   |   |       ├── example.guard.spec.ts
|   |   |       └── example.guard.ts
|   |   ├── mocks
|   |   |   └── example-mock.ts
|   |   ├── modules
|   |   |   └── example
|   |   |       └── example.module.ts
|   |   ├── app.component.html
|   |   ├── app.component.scss
|   |   ├── app.component.spec.ts
|   |   ├── app.component.ts
|   |   └── app-routing.module.ts
|   ├── assets
|   |   └── img
|   ├── environments
|   |   ├── environment.prod.ts
|   |   └── environment.ts
│   ├── browserlist
│   ├── favicon.ico
│   ├── index.html
│   ├── karma.conf.js
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── .editorconfig
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── tslint.json
```

## Coding Style
### Language
* All variables, functions and comments should be in English.
* All documentation for the client should be in English.

### Code
* All variables, functions and comments should be in `lowerCamelCase`
* Apply the single responsibility principle (SRP) to all components, services, and other symbols. This helps make the app cleaner, easier to read and maintain, and more testable.

### Files & Structure
* Name files `name.type.extension`. For example `home.component.ts`.

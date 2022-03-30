![](https://img.shields.io/badge/Build%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiesitftung%20Berlin-blue)

# XML Schema Validator for Berlin Geodata

Tool for validating geodata in GML format against XML-Schemas.

This tool is a prototype for a test operation, which can be further developed if necessary. For example, further schemata can easily be stored for validation. For questions and feedback please contact odis@technologiestiftung-berlin.de.

## Background

The Berlin administration provides geodata via the FIS-Broker as Open Data. In addition to data sets that are recorded and maintained directly by an administrative office throughout Berlin, i.e. spatially covering the entire city area, there is a multitude of other geodata that are the decentralized responsibility of the districts. Some of these data show a strong schematic heterogeneity among each other and can only be merged with a high effort. For this purpose, several workshops with employees of the district survey offices were conducted and standardized data schemes and presentation requirements were created for sample data sets. These data schemes are stored in this tool. By uploading or inserting a geodata set in GML file format, it can be validated against the corresponding schema. If the validator returns errors, the geodataset must be corrected to adapt it to the required schema.

## Deployment

To run this application we suggest using docker and running the container behind a reverse proxy using nginx. See the [gunicorn documentation](https://docs.gunicorn.org/en/latest/deploy.html) for further information.

You also can just run the docker container directly using

```bash
docker run -p "80:3333" technologiestiftung/xml-schema-validator:latest
```
Hint: Don't use the latest tag use a specific version. See the [docker hub page](https://hub.docker.com/r/technologiestiftung/xml-schema-validator/tags) for all of them.

or run it with docker compose from source. Make sure to change exposed port in docker-compose.yml form 3333 to 80 (http) or 443 (https).

```bash
docker-compose build  
docker-compose up
```

or you can run it directly with python.

```bash
cd path/to/xml-schema-validator-v2
pip install --user --requirement requirements.txt
gunicorn --workers 3 --bind="0.0.0.0:3333" --log-level=info app:app
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fabianmoronzirfas.me/"><img src="https://avatars.githubusercontent.com/u/315106?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Fabian Morón Zirfas</b></sub></a><br /><a href="https://github.com/technologiestiftung/xml-schema-validator/commits?author=ff6347" title="Code">💻</a> <a href="https://github.com/technologiestiftung/xml-schema-validator/commits?author=ff6347" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Lisa-Stubert"><img src="https://avatars.githubusercontent.com/u/61182572?v=4?s=64" width="64px;" alt=""/><br /><sub><b>Lisa-Stubert</b></sub></a><br /><a href="https://github.com/technologiestiftung/xml-schema-validator/commits?author=Lisa-Stubert" title="Code">💻</a> <a href="https://github.com/technologiestiftung/xml-schema-validator/commits?author=Lisa-Stubert" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
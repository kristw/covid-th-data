# covid-th-data

pulled from original API at https://data.go.th/dataset/covid-19-daily

This repo will check the source hourly and update if needed.

### Processed files

```js
// Same list of patients with the original result from API but include cleaning.
processed/covidThPatients-min.json
// Time series of new and total cases by province.
processed/timeSeriesByProvince-min.json
```

#### Example usage

```ts
d3.json('https://raw.githubusercontent.com/kristw/covid-th-data/master/processed/covidThPatients-min.json');
```

or can also use [jsDelivr](https://www.jsdelivr.com/) 's CDN

```ts
d3.json('https://cdn.jsdelivr.net/gh/kristw/covid-th-data@master/processed/covidThPatients-min.json');
```

### Raw query result

```
raw/covidThPatients.json
```

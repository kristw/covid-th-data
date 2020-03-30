```sql
SELECT *
LIMIT 100000
```

https://opend.data.go.th/get-ckan/datastore_search?resource_id=93f74e67-6f76-4b25-8f5d-b485083100b6&limit=100000

```sql
SELECT Province, Announce Date, count(no)
GROUP BY Province, Announce Date
```

https://opend.data.go.th/opend-search/vir_3277_1584880342/agg?dsname=vir_3277_1584880342&path=vir_3277_1584880342&aggf=count&agg_prop=col_1&groupby=col_8&groupby=col_5&loadAll=1&type=json&limit=100&offset=0
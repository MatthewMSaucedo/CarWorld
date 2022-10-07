# **CoronaVirus State Info**

### **Purpose**
<ul>
    <li>
        Aggregate 
        <a href="https://corona.lmao.ninja/">
            Johns Hopkins CoronaVirus case data
        </a>
        that is available by county to provide information <br />
        on CoronaVirus cases for the given State as a whole.
    </li>
</ul>

<hr />

### **API**

`(GET) getHistoricalData(state: string, daysBack: number): StateCoronaInformation` <br />
This endpoint returns the cumulative number of CoronaVirus cases and deaths for each day in the range of <br /> 
`daysBack` to the time of calling the API.

<hr />

### **Models**

```Javascript
StateCoronaInformation {
    name: string,
    days: DailyCoronaInformation[]
}

DailyCoronaInformation {
    mm/dd-1/yy: Day,
    mm/dd-2/yy: Day,
    ...
    mm/dd-{daysBack}/yy: Day
}

Day {
    cases: number,
    deaths: number
}
```
 <hr />

### **Run and Query Application**
To run this application, perform the following actions.
<ul>
    <li>Clone this repo</li>
    <li>Navigate to the repo folder via the command line</li>
    <li>Assuming you have Node installed (if not, go do that!): run `npm i`</li>
    <li>Run `npm run start`</li>
</ul>

This application will now be running locally. To query the endpoint, use the following url:
<ul><li>localhost:3000/coronastateinfo/gethistoricaldata</li>

Simply perform an HTTP GET request, with the request body detailed in the API section of this documentation. A curl request would look like the following:

```
curl --location --request GET 'http://localhost:3000/coronastateinfo/gethistoricaldata' \
--header 'Content-Type: application/json' \
--data-raw '{
	"state": "florida",
	"daysBack": 2
}'
```

## SimpleViz

A simple chart visualizer with an extendable plugin system to add API sources.

<img src="./public/demo.png">

## To add a plugin

1. Write a logic to return an array of objects from your data source. An object in a format of,

```
{
    date: "21-06-2022",
    price: "8755" 
}
```

2. Register the plugin in "index.html"

```
<script src="./plugins/alphaVantagePlugin.js"></script>
<script>
    registerPlugin(createAlphaVantagePlugin("ANET", "ANET"));
</script>
```

That's it, go and check the dropdown!

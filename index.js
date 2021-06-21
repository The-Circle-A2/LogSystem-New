const app = require('./app');

app.listen(process.env.PORT || 3050, () => {
    console.log('Running on port 3050')
})
const keys= require('./keys');
const redis = require('redis');
const redicClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy:() =>1000

});

const sub  = redis.RedisClient.duplicate();

function fib(index){
    if (index <2) return 1;
    return fib (index-1) + fib(index-2);
}

sub.on('message',(channel,message)=>{
    RedisClient.hset('values',message,fib(parseInt(message)));
});
sub.subscribe('insert');

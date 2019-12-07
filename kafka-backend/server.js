var connection = new require('./kafka/Connection');
var Auth = require('./services/authenticationService');
var User = require('./services/userService');
var Order = require('./services/orderService');
var Rest = require('./services/restaurantService');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@grubhubparent-cy2ev.mongodb.net/test?retryWrites=true&w=majority', function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log(res);
    }
});

function handleTopicRequest(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            if (res != null) {
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }];
                producer.send(payloads, function (err, data) {
                    console.log(data);
                });
                return;
            }
        });

    });
}

handleTopicRequest("GAuth", Auth)
handleTopicRequest("GUsers", User)
handleTopicRequest("GOrders", Order)
handleTopicRequest("GRest", Rest)


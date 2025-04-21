({
    handleComponentEvent : function(component, event, helper) {
        console.log("in parent component handleComponentEvent");
        var message = event.getParam("message");
        console.log("message is : ", message);
    },
    handleApplicationEvent : function(c, e, h){
        console.log("in parent component handleApplicationEvent");
        var message = e.getParam("message");
        console.log("message is : ", message);
    }
})

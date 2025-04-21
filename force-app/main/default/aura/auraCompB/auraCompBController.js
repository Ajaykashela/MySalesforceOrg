({
    compEvent : function(component, event, helper) {
        console.log('event to be called : comp');
        var comp_event = component.getEvent('compEvent1');
        console.log('comp event : ', comp_event);
        comp_event.setParams({ message : 'message from event in comp B'});
        console.log('event params set');
        comp_event.fire();
        console.log('event fired');
    },
    applicationEvent: function(c, e, h){
        console.log('application event child method');
        var app_event = $A.get("e.c:applicationEvent");
        app_event.setParams({ message : 'message from App event in comp B'});
        console.log('event params set');
        app_event.fire();
        console.log('event fired');
    }
})

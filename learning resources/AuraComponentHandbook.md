
# 🔹 Aura Component Developer Handbook

## 1. Component Anatomy & Structure
```xml
<aura:component>
    <aura:attribute name="example" type="String" default="Hello"/>
    <lightning:card title="My Card">
        {!v.example}
    </lightning:card>
</aura:component>
```

## 2. Attributes, Expressions & Data Types
- `String`, `Boolean`, `Integer`, `List`, `Map`, `Object`, `Component[]`
- Bindings: `{!v.attributeName}`
- Expression support: `{!v.isVisible ? 'Show' : 'Hide'}`

## 3. Events (Component vs Application)
### Component Event
```xml
<!-- Event -->
<aura:event type="COMPONENT" name="compEvent">
    <aura:attribute name="message" type="String"/>
</aura:event>

<!-- Child Component -->
<aura:registerEvent name="compEvent" type="c:compEvent"/>
<lightning:button onclick="{!c.fireEvent}" />

<!-- Parent Component -->
<aura:handler name="compEvent" event="c:compEvent" action="{!c.handleEvent}" />
```

### Application Event
```xml
<aura:event type="APPLICATION" name="appEvent">
    <aura:attribute name="message" type="String"/>
</aura:event>

$A.get("e.c:appEvent").setParams({message: "Hi"}).fire();
```

## 4. Parent-Child Communication
- Via attributes (downward)
- Via events (upward)
- `aura:method` for calling child logic
```xml
<aura:method name="childMethod" action="{!c.methodHandler}"/>
```

## 5. Lifecycle Hooks
- `init`, `render`, `afterRender`, `rerender`, `unrender`
```js
({
    doInit : function(component, event, helper) {
        console.log("Initialized");
    }
})
```

## 6. Iteration & Conditional Rendering
```xml
<aura:iteration items="{!v.items}" var="item">
    {!item.name}
</aura:iteration>

<aura:if isTrue="{!v.isVisible}">
    <p>Visible</p>
    <aura:set attribute="else">
        <p>Hidden</p>
    </aura:set>
</aura:if>
```

## 7. Apex Integration
```apex
@AuraEnabled
public static List<Account> getAccounts() {
    return [SELECT Name FROM Account LIMIT 10];
}
```
```js
var action = component.get("c.getAccounts");
action.setCallback(this, function(response){
    component.set("v.accounts", response.getReturnValue());
});
$A.enqueueAction(action);
```

## 8. force:recordData (LDS)
```xml
<force:recordData recordId="{!v.recordId}"
                  targetFields="{!v.record}"
                  layoutType="FULL"
                  mode="VIEW"/>
```

## 9. Navigation with PageReference
```js
var navService = component.find("navService");
var pageReference = {
    type: 'standard__recordPage',
    attributes: {
        recordId: '001xx000003DHP0AAO',
        objectApiName: 'Account',
        actionName: 'view'
    }
};
navService.navigate(pageReference);
```

## 10. Dynamic Component Creation
```js
$A.createComponent("c:myComponent", {}, function(newCmp){
    var body = component.get("v.body");
    body.push(newCmp);
    component.set("v.body", body);
});
```

## 11. Toast Messages
```js
var toast = $A.get("e.force:showToast");
toast.setParams({
    title: "Success!",
    message: "Record saved successfully.",
    type: "success"
});
toast.fire();
```

## 12. UI Components
- Inputs: `<lightning:input type="text" value="{!v.name}"/>`
- Buttons: `<lightning:button label="Click"/>`
- Layout: `<lightning:layout>`, `<lightning:layoutItem>`
- Cards, Spinners, Badges, Toasts

## 13. Styling (SLDS)
```html
<div class="slds-box slds-theme_alert-texture">Hello SLDS</div>
```

## 14. Debugging Tips
- Use Chrome DevTools
- `$A.log()`, `console.log()`
- Lightning Inspector Extension

## 15. Best Practices
- One controller/helper per component
- Always use Locker-compliant code
- Break into small reusable components

## 16. Common Errors
- `Unknown component`, check namespace
- `Invalid attribute`, typo or misused prop
- Event not fired: check registration and handler names

---
Let me know if you'd like example projects for each section next!

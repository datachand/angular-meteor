angular-meteor v0.3.
========
> The simplest no-conflict way to use AngularJS with Meteor.

> angular-meteor v0.3.2 is compatible with Meteor 1.0.

## Quick start
1. Install [Meteor](http://docs.meteor.com/#quickstart) <code>curl https://install.meteor.com | /bin/sh</code>
3. Create a new meteor app using <code>meteor create myapp</code> or navigate to the root of your existing app.
4. Install ngMeteor <code>meteor add superchris:ng-meteor</code>

## Usage
### Table of Contents
- [New Data-Binding to avoid conflict](#new-data-binding-to-avoid-conflict)
- [Using Meteor Collections](#using-meteor-collections)

### New Data-Binding to avoid conflict
To prevent conflicts with Meteor's Blaze live templating engine, ngMeteor has changed the default AngularJS data bindings from <code>{{...}}</code> to <code>[[...]]</code>. For example:

    <div>
        <label>Name:</label>
        <input type="text" ng-model="yourName" placeholder="Enter a name here">
        <hr>
        <h1>Hello [[yourName]]!</h1>
    </div>

### Using Meteor Collections
> If you're upgrading from v0.1 please read this section for changes on using the $collection service.

ngMeteor provides an AngularJS service called $collection, which is a wrapper for [Meteor collections](http://docs.meteor.com/#meteor_collection) to enable reactivity within AngularJS. The $collection service no longer subscribes to a publisher function automatically, so you must explicitly subscribe to a publisher function before calling the $collection service.

    $collection(collection, selector, options)

| Arguments     | Type                                                                      | Description                                                       | Required  |
| :------------ | :------------------------------------------------------------------------ | :---------------------------------------------------------------- | :-------- |
| collection    | [Meteor Collection Object](http://docs.meteor.com/#meteor_collection)     | The Meteor Collection                                             | Yes       |
| selector      | [Mongo Selector (Object or String)](http://docs.meteor.com/#selectors)    | Same as [Meteor Collection Find](http://docs.meteor.com/#find)    | No        |
| options       | Object                                                                    | Same as [Meteor Collection Find](http://docs.meteor.com/#find)    | No        |

The $collection service only has the following methods

<code>bind</code> - used to bind the collection to an Angular model so that you can use it in your scope:

    bind(scope, model, auto)

| Arguments     | Type      | Description                                                                                                                                                                                                                                                              | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------                                                                                                                                                                                                | :-------- | :-------- |
| scope         | Scope     | The scope the collection will be bound to.                                                                                                                                                                                                                               | Yes       |           |
| model         | String    | The model the collection will be bound to.                                                                                                                                                                                                                               | Yes       |           |
| auto          | Boolean   | By default, changes in the model will not automatically update the collection. However if set to true, changes in the client will be automatically propagated back to the collection. A deep watch is created when this is set to true, which sill degrade performance.  | No        | false     |


Once a collection has been bound using the <code>bind</code> method, the model will have access to the following methods for upserting/removing objects in the collection. If the <code>auto</code> argument as been set to true, then the user will not need to call these methods because these methods will be called automatically whenever the model changes.

| Method                    | Argument  | Type                                  | Description                                                                                                                       |
| :------------             | :------   | :-------------------------            | :-------------                                                                                                                    |
| <code>save(docs)</code>   | docs      | Object or Array of Objects            | Upsert an object into the collection. If no argument is passed, all the objects in the model to the collection will be upserted.  |
| <code>remove(keys)</code> | keys      | _id String or Array of _id Strings    | Removes an object from the collection. If no argument is passed, all the objects in the collection will be removed.               |

<code>paginate</code> - Like bind, but paginates the collection:

    paginate(scope, model)

| Arguments     | Type      | Description                                                                 | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------   | :-------- | :-------- |
| scope         | Scope     | The scope the collection will be bound to.                                  | Yes       |           |
| model         | String    | The model the collection will be bound to.                                  | Yes       |           |

Paginate will use the following scope properties to implement pagination:

| Property      | Type      | Description                                                                                 | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------                   | :-------- | :-------- |
| perPage       | Number    | The numer of items on each page                                                             |           |
| page          | Number    | The current page number (1 based). A $watch is setup to refetch the collection on change    | Yes       |           |

<code>bindOne</code> - used to bind the a single model to your scope:

    bind(scope, model, id)

| Arguments     | Type      | Description                                                                   | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------     | :-------- | :-------- |
| scope         | Scope     | The scope the model will be bound to.                                         | Yes       |           |
| model         | String    | The scope property the model will be bound to.                                | Yes       |           |
| id            | String    | The id used to look up the model from the collection                          | Yes       |           |

<code>bindOneAssociation</code> - used to bind the a related model to your scope:

    bind(scope, model, expression)

| Arguments     | Type      | Description                                                                                     | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------                       | :-------- | :-------- |
| scope         | Scope     | The scope the model will be bound to.                                                           | Yes       |           |
| model         | String    | The scope property the model will be bound to.                                                  | Yes       |           |
| association   | String    | An angular expression. A $watch will be added and it will be used to lookup the related model   | Yes       |           |

An example app that demonstrates all the features of ng-meteor is available [here](http://github.com/superchris/ngmeteor-cookbook)

angular-meteor v0.3.
========

> Angular and Meteor, so happy together

angular-meteor is a meteor package that allows you to easily build meteor
applications with an angular front end. It bridges the reactivity of meteor
with the binding of angular.

### Compatibility

Version 0.3.2 and later has been tested with Meteor 1.0

## Quick start
1. Install [Meteor](http://docs.meteor.com/#quickstart) <code>curl https://install.meteor.com | /bin/sh</code>
3. Create a new meteor app using <code>meteor create myapp</code> or navigate to the root of your existing app.
4. Install angular-meteor <code>meteor add superchris:ng-meteor</code>

### Bootstrapping your module

With Meteor, you lose ng-app. It's not a big deal though.
Make a lib/app.(coffee | js) that bootstraps and depends on ngMeteor:

````coffeescript
    angular.module "app", ["ngMeteor", "ngRoute"]

    Meteor.startup ->
      angular.bootstrap(document, ["app"])
````

### Angular expressions

You'll need to use [[]] instead of {{}} in your angular expressions. Blaze, meteor's
template engine, takes over {{}} and I have not yet found a way around this. For example:

````html
    <div>
        <label>Name:</label>
        <input type="text" ng-model="yourName" placeholder="Enter a name here">
        <hr>
        <h1>Hello [[yourName]]!</h1>
    </div>
````

### Templates

Your templates with live in the templates folder of your Meteor app. They will
need to be wrapped with a template element with a name attribute. This name attribute
is what you will use to refer to your template in routes, directives, etc.

````html
<template name="recipe.html">
  <div id="recipe_view">
    <dl>
      <dt>[[recipe.title]]</dt>
      <dd>[[recipe.description]]</dd>
      <dd>[[category.name]]</dd>
    </dl>
    <p>
      Ingredients:
      <ul>
        <li ng-repeat="ingredient in recipe.ingredients">[[ingredient.name]]</li>
      </ul>
    </p>
    <a href="#recipes/[[recipe._id]]/edit">Edit</a>
  </div>
</template>
````
### Services

ngMeteor gives you two services you'll use in your app to talk to Meteor
from Angular: `$collection` and `$user`

### $collection

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

### $user

`$user` only has one method, `bind`:

<code>bind</code> - used to bind Meteor.user to an Angular model so that you can use it in your scope:

    bind(scope, model)

| Arguments     | Type      | Description                                                                                                                                                                                                                                                              | Required  | Default   |
| :------------ | :-------- | :------------------------------------------------------------------------                                                                                                                                                                                                | :-------- | :-------- |
| scope         | Scope     | The scope the user will be bound to.                                                                                                                                                                                                                               | Yes       |           |
| model         | String    | The model the user will be bound to.                                                                                                                                                                                                                               | Yes       |           |

### Example apps

* [Leaderboard]
* [Cookbook](http://github.com/superchris/ngmeteor-cookbook)

### Acknowledgement

This project started as [ngMeteor](https://github.com/loneleeandroo/ngMeteor), a pre-0.9 atmosphere package. I've updated
it for Meteor 1.0 and added several features.

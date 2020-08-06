# 1. Register helper and tag architecture

Date: 2020-07-17

## Status

Accepted

## Context

Plan: To make the template engine extensible and still support custom helpers and 
tags as supported by the underlying template languages.
Since the template engine currently supports Handlebars and Liquid, and can support more 
template languages in the future a need for consistent mechanism was required. 

## Decision

To achieve a consistent mechanism, various template languages were compared (namely handlebars, 
liquid, nunjucks, jsRender) to jot down similarities for registration of helpers and tags. 
Which led to conclusion that most templating language support two types of custom functions/helpers:
one: helpers or filters that are basic function that work on the input 
two: tags or extension that may provide both parse function and render function to provide more flexibility

To incorporate both, the proposal was to have underlying separate methods for registering helpers and tags,
and expose only a custom template options object as part of the initial setup call. This helps make setup
less error prone as tags/extensions are required while parsing templates which happens in the setup call. 
This would also lead to easier maintainance of the custom helpers and tags for large teams using the package,
since there would be only one place to add all helpers and tags. 

## Consequences

Exposing only a custom templating options object would mean less flexibility of defining helpers and tags, 
but this can be revisited if the need does arise for such cases.

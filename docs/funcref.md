
### Function Reference


- [isfunction](#isfunction)        - returns true if function is available, false otherwise
- [type](#type)       - returns the internal type of the node passed as arguement
- [call](#call)   - dynamically calls a function *funcName* with arguments provided individually. 
- [apply](#apply)      - dynamically calls a function *funcName* with arguments provided as a list. 
- [if](#if)         - returns left if bool is true, otherwise returns right.


### isfunction

##### Syntax: 
    isfunction(funcName :string): boolean
##### Description:
Accepts the name of a function passed as string
returns true if the function is available, false otherwise:

a function is available if it is a [built-in function](http://lesscss.org/functions/) or 
is added via plugin to function registry.

**return type**: boolean

**throws**: error if no argument is provided or if the first argument is not string.

##### Example:
*less*
```less
p {
  res: isfunction("green");
}
```
*css*

```css
p {
  res: true;
}
```

### type

##### Syntax: 
    type(elem :Node): string
##### Description:
returns the internal type, [a subtype of node](https://github.com/less/less.js/tree/3.x/lib/less/tree), of elem as a string.

**return type**: string

**throws**: error if no argument is provided

##### Example:
*less*
```less
p {
  res: type("foo");
}
```
*css*

```css
p {
  res: "Quoted";
}
```

### call

##### Syntax: 
    call(funcName :string, ...args)
##### Description:
dynamically calls a function *funcName* with arguments provided individually. 


**return type**: the return type of the invoked function.

**throws**: error if no argument is provided or if the first argument is not string.

##### Example:
*less*
```less

p {
  color: call("rgb", 255, 255, 255);
}
```
*css*

```css
p {
  color: #FFFFFF;
}
```

### apply

##### Syntax: 
    apply(funcName :string, args: list)
##### Description:
dynamically calls a function *funcName* with arguments provided as a list. 

**return type**: the return type of the invoked function.

**throws**: error if no argument is provided or if the first argument is not string.

##### Example:
*less*
```less
@border-col: 255 255 255;
@list: 5px, 10px, 3px;
@col: "cornflowerBlue"
p {
  border-color: apply("rgb", @border-col);
  margin-top: apply("min", @list);
  color: apply("color", @col);
}
```
*css*

```css
p {
  border-color: #FFFFFF;
  margin-top: 3px;
  color: #6495ed;
}
```

### if

##### Syntax: 
    if(bool: boolean, left: any, right: any): any
##### Description:
returns left if bool is true, otherwise returns right.
Note: [every value but the keyword true is falsy](http://lesscss.org/features/#mixin-guards-feature-guard-comparison-operators) 


**return type**: type of left if bool is true, 

**throws**: error if less than 3 arguments are provided.

##### Example:
*less*
```less
@border-col: 255 255 255;
@list: 5px, 10px, 3px;
@col: "cornflowerBlue"
p {
  border-color: apply("rgb", @border-col);
  margin-top: apply("min", @list);
  color: apply("color", @col);
}
```
*css*

```css
p {
  border-color: #FFFFFF;
  margin-top: 3px;
  color: #6495ed;
}
```
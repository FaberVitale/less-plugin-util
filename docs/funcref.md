
### Function Reference


- [isfunction](#isfunction)        - returns true if function is available, false otherwise.
- [type](#type)       - returns the internal type of the node passed as arguement.
- [call](#call)   - dynamically calls a function *funcName* with arguments provided individually. 
- [apply](#apply)      - dynamically calls a function *funcName* with arguments provided as a list. 
- [if](#if)         - returns *left* if *bool* is true, otherwise returns *right*.

#### String Functions

- [str-includes](#str-includes)        - returns true if *key* is substring of *target*, false otherwise.
- [str-starts-with](#str-starts-with)       - returns true if *target* starts with *key* string, false otherwise.
- [str-ends-with](#str-ends-with)   - returns true if *target* ends with *key* string, false otherwise. 
- [str-index-of](#str-index-of)      - returns the index of substring *key* of *target* if present, -1 otherwise.
- [str-length](#str-length)       - returns length of *target* string. 
- [str-slice](#str-slice)         - returns substring of *target*, given *startIndex* and *endIndex*.
- [str-search](#str-search)       - returns index of first instance of pattern *regex* if present, otherwise -1. 
- [str-test](#str-test)         - returns true if the pattern *regex* is found in *target* string, false otherwise.  

<hr/>

### General

### isfunction

##### Syntax: 
    isfunction(funcName :string): boolean
##### Description:
Accepts the name of a function passed as string.
Returns true if the function is available, false otherwise:

a function is available, if it is a [built-in function](http://lesscss.org/functions/) or 
is added via plugin to function registry.

**return type**: boolean

**throws**: error if first argument is not string.

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
returns the internal type of *elem*, [a subtype of node](https://github.com/less/less.js/tree/3.x/lib/less/tree), as a string.

**return type**: string.

**throws**: error if no argument is provided.

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
  color: #ffffff;
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
@col: "cornflowerBlue";
p {
  border-color: apply("rgb", @border-col);
  margin-top: apply("min", @list);
  color: apply("color", @col);
}
```
*css*

```css
p {
  border-color: #ffffff;
  margin-top: 3px;
  color: #6495ed;
}
```

### if

##### Syntax: 
    if(bool: any, left: any, right: any): any
##### Description:
returns *left* if bool is true, otherwise returns *right*.
Note: [every value but the keyword true is falsy](http://lesscss.org/features/#mixin-guards-feature-guard-comparison-operators) 


**return type**: type of *left* if bool is true, type of *right* otherwise. 

**throws**: error if less than 3 arguments are provided.

##### Example:
*less*
```less
@content-asterisk: "*";
@content-none: "";
@is-content-none: true;

.item::before {
  content: if(@is-content-none, @content-none, @content-asterisk);
}
```
*css*

```css
.item::before {
  content: "";  
}
```
<hr/>

### String Functions

### str-includes

##### Syntax: 
    str-includes(target :string, key: string): boolean
##### Description:
Returns true if *key* is a substring of target, false otherwise.

Note: the outcome is independent of the possible difference in quotation between *target* and *key*, the empty string("") is always included in any string.

**return type**: boolean

**throws**: error if less than 2 arguments are provided and if both are not string.

##### Example:
*less*
```less
@logo-url: "http://www.random.domain.com/resources/images/logo-alt.png";

@logo-alt: "logo-alt";

p {
  truthy: str-includes(@logo-url, @logo-alt);     
}
```
*css*

```css
p {
  truthy: true;
}
```
### str-starts-with

##### Syntax: 
    str-starts-with(target :string, key: string): boolean
##### Description:
Returns true if *key* is prefix of *target*, false otherwise.

Note: the outcome is independent of the possible difference in quotation between *target* and *key* and the empty string("") is always prefix.

**return type**: boolean

**throws**: error if less than 2 arguments are provided and if both are not string.

##### Example:

*less*
```less
@website: "http://www.google.com";
@http-prot: "http://";
@file-prot: "file://";

p {
  truthy: str-starts-with(@website, @http-prot);
  falsy: str-starts-with(@website, @file-prot);
}
```
*css*
```css
p {
  truthy: true;
  falsy: false;
}
```

### str-ends-with

##### Syntax: 
    str-ends-with(target :string, key: string): boolean
##### Description:
Returns true if *key* is suffix of *target*, false otherwise.

Note: the outcome is independent of the possible difference in quotation between *target* and *key* and the empty string("") is always suffix.

**return type**: boolean

**throws**: error if less than 2 arguments are provided and if both are not string.

##### Example:
*less*
```less
@png: ".png";
@gif: ".gif";

@logo: "http://www.random.domain.com/resources/images/logo.png";


.logo {
  res: if(str-ends-with(@logo, @png), png, other);
}
```
*css*

```css
.logo {
  res: png;
}
```
### str-index-of

##### Syntax: 
    str-index-of(target :string, key: string): number
##### Description:
Returns a new number, zero-based index where the first instance of the substring *key* is located, if present, otherwise returns -1.

Note: the outcome is independent of the possible difference in quotation between *target* and *key* and the empty string("") has always index 0.

**return type**: number

**throws**: error if less than 2 arguments are provided and if both are not string.

##### Example:
*less*
```less
@url: "http://www.google.com";
@domain: "google";
@protocol:  "http://";

p {
  domain-substring-index: str-index-of(@url, @domain);
  protocol-substring-index: str-index-of(@url, @protocol);   
}
```

*css*

```css
p {
  domain-substring-index: 11;
  protocol-substring-index: 0;
}
```

### str-length

##### Syntax: 
    str-length(target :string): number
##### Description:
Returns a new number, representing the length of the string passed as argument.

**return type**: number

**throws**: error if first argument is not string.

##### Example:
*less*
```less
@google: "google";
@gmail: 'gmail';

.foo {
  google-len: str-length(@google);
  gmail-len: str-length(@gmail);
}
```
*css*
```css
.foo {
  google-len: 6;
  gmail-len: 5;
}
```
### str-slice

##### Syntax: 
    str-slice(target :string, startIndex?: number, endIndex?: number): string
##### Description:
Returns a new string, substring of *target* using *startIndex* and *endIndex*,<br>
if both indexes are omitted returns the original string *target*.<br>
Quotation style of the result string is based on *target's* quotation.

*startIndex*: the zero-based start index(**inclusive**) of the result string.
* if it is a float, the decimal part is truncated(rounded torward 0).
* if it is negative, the start index is:  ```str-length(target) + startIndex```.
* unit(s) of startIndex do not affect the outcome.
* if ```| startIndex | > str-length(target)``` returns empty string.

*endIndex*: the zero-based end index(**exclusive**) of the result string.
* if it is a float, the decimal part is truncated(rounded torward 0).
* if it is negative, the start index is:  ```str-length(target) + endIndex```.
* unit(s) of endIndex do not affect the outcome.
* if omitted  or higher than ```str-length(target)```, *endIndex* is set to ```str-length(target)```.



**return type**: string

**throws**: error if first argument is not string.

##### Example:
*less*
```less
@url: "http://www.google.com";  // str-length(@url) == 21;

p {
  no-indexes: str-slice(@url);                  // returns @url

  start-index: str-slice(@url, 11);             // substring range[11; 21)
  start-index-negative: str-slice(@url, -3);    // substring range[18; 21)
  start-index-float: str-slice(@url, -3.999);   // same result as above

  end-index: str-slice(@url, 11, 17);           // substring range [11; 17) 
  end-index-negative: str-slice(@url, -10, -4); // same result as above
  end-index-float: str-slice(@url, -10.1, -4.9);// same result as above
}
```
*css*
```css
p {
  no-indexes: "http://www.google.com";
  start-index: "google.com";
  start-index-negative: "com";
  start-index-float: "com";
  end-index: "google";
  end-index-negative: "google";
  end-index-float: "google";
}

```
### str-search

##### Syntax: 
    str-search(target :string, regex: string, flags?: string): number
##### Description:
Returns a new number, the zero-based index where the first instance of pattern *regex* is found in *target*, if present, -1 otherwise.

*regex*: a regular expression, special charcters have to be escaped (e.g. ```/\w+/ -> "\\w+"```).   
[An overview on regular expressions.](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions)

*flags*: an optional string with the flags associated to the pattern(e.g. ```/.../gi -> "gi"```),<br/> [more info here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

**return type**: number

**throws**: error if first and second arguements are not string, if pattern *regex* syntax is invalid or invalid *flags* are passed.

##### Example:
*less*
```less
@img-re: "\.(png|jpe?g|gif|tiff)$";         //matches common image ext
@url: "http://www.domain.com/funnycat.gif";

.link {
  image-file-ext: str-slice(@url, str-search(@url, @img-re));
}
```
*css*
```css
.link {
  image-file-ext: ".gif";
}

```

### str-test

##### Syntax: 
    str-test(target :string, regex: string, flags?: string): boolean
##### Description:
Returns true if the pattern *regex* is found in *target*, false otherwise.


*regex*: a regular expression, special charcters have to be escaped (e.g. ```/\w+/ -> "\\w+"```).   
[An overview on regular expressions.](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions)

*flags*: an optional string with the flags associated to the pattern(e.g.```/.../gi -> "gi"```),<br/> [more info here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

**return type**: number

**throws**: error if first and second arguements are not string, if the pattern *regex* syntax is invalid or invalid *flags* are passed.

##### Example:
*less*
```less
@img-re: "\.(png|jpe?g|gif|tiff)$"; //matches common image file extensions
@prot-re: "^https?"; //matches http & https at the start
@flags: "i";                        //"i" makes the search case insensitive

@url: "http://www.domain.com/funnycat.GIF"; //uppercase for some odd reason

.link {
  is-web-prot: str-test(@url, @prot-re);
  is-image: str-test(@url, @img-re, @flags); 
}
```
*css*
```css
.link {
  is-web-prot: true;
  is-image: true;
}

```
## less-plugin-util
A set of useful functions for [Less](http://www.lesscss.org/)


### Functions
Function | Description
------------------ | ----------------------------
isfunction(funcName: string) | returns true if *funcName* function is available, false otherwise.
type(node: Node) | returns the subtype of Node passed as argument.
call(funcName: string, arg1, arg2,...) | dynamically calls a function *funcName* with arguments provided individually  
apply(funcName: string, args: list) | dynamically calls a function *funcName* with arguments provided as a list  
if(bool: boolean, left: any, right: any) | returns left if bool is true, otherwise returns right. Note: [every value but the keyword true is falsy](http://lesscss.org/features/#mixin-guards-feature-guard-comparison-operators) 


version 0.1.0

**Licence** [MIT](https://github.com/FaberVitale/less-plugin-util/blob/master/LICENSE)

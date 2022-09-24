export function set(args, Data) {

    if (args.length === 0) {
        return {
        content: "Missing arguments: property, value", 
        type: "error", 
        details: ["Property: name of property. Ex. color", "value: Value of property. Ex. red"]
        }
    }

    let [property, value] = args

    // check if value is not given, because property must be in there if not error above would be called
    if (value === undefined) {
        return {
        content: "Missing arguments: value", 
        type: "error", 
        details: [ "value: Value of Property. Ex. red"]
        }
    }


    // check property
    if (property === "nick" || property === "name") {
        let {username, setUsername} = Data
        let oldName = username

        // content must be created before setting name because of react state
        let content = `Changed nick: ${oldName} -> ${value}`
        setUsername(value)  

        return { type: "success", content: content }
    }

    else if (property === "color") {
        function isValidColor(strColor) {
            var s = new Option().style;
            s.color = strColor;
          
            // return 'false' if color wasn't assigned
            return s.color !== '';
        }

        // check if color is valid
        if (isValidColor(value) === false) {
            return {type: "error", content: `Invalid color value: ${value}`}
        }

        let {color, setColor} = Data
        let oldColor = color

        // content must be created before setting name because of react state
        let content = `Changed nick color: ${oldColor} -> ${value}`
        setColor(value)

        return { type: "success", content: content }
    } 


    else {
        return { content: `Unknown property: ${property}`, type: "error" }
    }

    return {content: 'Default ser return'}
}
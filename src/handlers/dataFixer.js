exports.sanitize = (formData) => {
    console.log('Do not forget to fix sanitizer')
    return formData
}

exports.dataIsComplete = (formData) => {
    /*
    Method to check if the sanitized formdata is fulfilling the requirements
    */
    console.log('do not forget to fix dataIsComplete')

    return true
}

exports.parseImageData = (formData) => {
    let clone = JSON.parse( JSON.stringify( formData ) )

    console.log('fix the imageparser')

    return clone
}

exports.parseDates = (formData) => {
    console.log('TODO - Fix the date parser')
    return formData
}
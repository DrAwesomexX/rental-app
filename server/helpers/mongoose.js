module.exports = {
  normalizeErrors: function(errors) {
    let detailOfError = [];
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        detailOfError.push({
          title: property,
          detail: errors[property].message
        });
      }
    }

    return detailOfError;
  }
};

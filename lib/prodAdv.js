exports.init = function(genericAWSClient) {
  //creates an Amazon Product Advertising API Client
  var createProdAdvClient = function(accessKeyId, secretAccessKey, associateTag, options) {
      options = options || {};

      var client = prodAdvClient({
        host: options.host || "ecs.amazonaws.com",
        path: options.path || "/onca/xml",
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        associateTag: associateTag,
        secure: options.secure,
        version: options.version,
        region: options.region || "US"
      });
      return client;
    }
    // Amazon Product Advertising API handler which is wrapped around the genericAWSClient
  var prodAdvClient = function(obj) {
    var aws = genericAWSClient({
      host: obj.host,
      path: obj.path,
      accessKeyId: obj.accessKeyId,
      secretAccessKey: obj.secretAccessKey,
      secure: obj.secure
    });
    obj.call = function(action, query, callback) {
      query["Operation"] = action;
      query["Service"] = "AWSECommerceService";
      query["Version"] = obj.version || '2011-08-01';
      query["AssociateTag"] = obj.associateTag;
      query["ResponseGroup"] = "ItemAttributes, Offers, Images";
      query["Region"] = obj.region;
      query["ItemPage"] = query.ItemPage || "1";
      return aws.call(action, query, callback);
    }
    return obj;
  }
  return createProdAdvClient;
}

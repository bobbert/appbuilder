module.exports = function (app, Marker) {
    var controller = {};

    controller.preSearch = [
        function (req, res, next) {
            console.log('this it?');
            req.query = {userId: req.user.id};
            req.Model = Marker;
            next();
        }
    ]
    controller.preCreate = [
        function (req, res, next) {
            req.body.userId = req.user.id;
            req.Model = Marker;
            next();
        }
    ]
    controller.preUpdate = [
        function (req, res, next) {
            //try to find a marker that matches the ID in the uri and belongs to the user who is logged i
            Marker.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a marker that isn't yours?!?!?!
                req.Model = Marker;
                next();
            });
        }
    ]
    controller.preDestroy = [
        function (req, res, next) {
            //try to find a marker that matches the ID in the uri and belongs to the user who is logged in
            Marker.find({_id: req.params.id, userId: req.user.id}, function (err, results) {
                if (err) return next(err);
                if(!results) return res.send(401); //trying to update a marker that isn't yours?!?!?!
                req.Model = Marker;
                next();
            });
        }
    ]

    return controller;
}

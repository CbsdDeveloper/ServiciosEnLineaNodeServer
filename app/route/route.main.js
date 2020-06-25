'use strict';
module.exports = function(app) {

    const resourcesRoutes = require('./route.resources');
    app.use('/api/paginate/resources', resourcesRoutes);
    app.use('/api/resources', resourcesRoutes);

    const adminRoutes = require('./route.admin');
    app.use('/api/paginate/admin', adminRoutes);
    app.use('/api/admin', adminRoutes);

    const tthhRoutes = require('./route.tthh');
    app.use('/api/paginate/tthh', tthhRoutes);
    app.use('/api/tthh', tthhRoutes);

    const administrativeRoutes = require('./route.administrative');
    app.use('/api/paginate/administrative', administrativeRoutes);
    app.use('/api/administrative', administrativeRoutes);

    const subjefatureRoutes = require('./route.subjefature');
    app.use('/api/paginate/subjefature', subjefatureRoutes);
    app.use('/api/subjefature', subjefatureRoutes);

    const financialRoutes = require('./route.financial');
    app.use('/api/paginate/financial', financialRoutes);
    app.use('/api/financial', financialRoutes);

    const permitsRoutes = require('./route.permits');
    app.use('/api/paginate/permits', permitsRoutes);
    app.use('/api/permits', permitsRoutes);

    const planingRoutes = require('./route.planing');
    app.use('/api/paginate/planing', planingRoutes);
    app.use('/api/planing', planingRoutes);

    const preventionRoutes = require('./route.prevention');
    app.use('/api/paginate/prevention', preventionRoutes);
    app.use('/api/prevention', preventionRoutes);

};
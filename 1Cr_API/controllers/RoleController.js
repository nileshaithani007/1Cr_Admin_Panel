const Role = require('../data/Role');
 
// ------------------------------Organization Master Controller---------------------------------------------------
 
const spRoleController = async(req, res, next) => {
    try {
        const action = req.body.Operation || req.body.action || req.body.operation;
        req.body.Operation = action;

        console.log(action)
        if (!action) {
            return res.status(400).json({ message: 'Operation is required' });
        }
 
        const result = await Role.spRole(req.body);
 
        if (result && !result.error) {
            switch (action) {
                case 'Create':
                    res.status(200).json({ message: 'Role Created!' });
                    break;
                case 'Get':
                    res.status(200).json({ data: result[0]});
                    break;
                case 'Update':
                    res.status(200).json({ message: 'Role Updated!' });
                    break;
                case 'Deactivate':
                    res.status(200).json({ message: 'Role Deactivated!' });
                    break;
                case 'Activate':
                    res.status(200).json({ message: 'Role Activated!' });
                    break;
                default:
                    res.status(400).json({ message: 'Invalid Operation' });
                    break;
            }
        } else {
            res.status(400).json({ message: 'Something Went Wrong' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error', error: e.message });
    }
};
 
//-----------------------------Exporting Modules------------------------------------------------
module.exports = { spRoleController };
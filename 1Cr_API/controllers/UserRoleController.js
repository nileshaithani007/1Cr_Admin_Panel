const UserRole = require('../data/UserRole');
 
// ------------------------------User Role Master Controller---------------------------------------------------
 
const spUserRoleController = async(req, res, next) => {
    try {
        const action = req.body.Operation || req.body.action || req.body.operation;
 
        if (!action) {
            return res.status(400).json({ message: 'Operation is required' });
        }
 
        const result = await UserRole.spUserRole(req.body);
 
        if (result && result.length > 0) {
            switch (action) {
                case 'Create':
                    res.status(200).json({ message: 'UserRole Created!' });
                    break;
                case 'Get':
                    res.status(200).json({ data: result[0] });
                    break;
                case 'Update':
                    res.status(200).json({ message: 'UserRole Updated!' });
                    break;
                case 'Deactivate':
                    res.status(200).json({ message: 'UserRole Deactivated!' });
                    break;
                case 'Activate':
                    res.status(200).json({ message: 'UserRole Activated!' });
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
module.exports = { spUserRoleController };
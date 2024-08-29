'use strict';

const SideMenu = require('../data/SideMenu');


const GetSideMenu = async (req, res, next) => {
    try {
        const Result = await SideMenu.GetSideMenu(req.body);
        if (Result[0] != null) {
            res.status(200).json({ data: Result[0], message: 'Data Fetch Successfully' });
        }
        else {
            res.status(404).json({ message: 'Data Not Found' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Something Wrong Wrong' });
    }
};

module.exports = {GetSideMenu}
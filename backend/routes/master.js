const express = require('express');
const router = express.Router()

const { UnitMaster,  DepartmentMaster,UserRoleMaster,EntityMaster, DivisionMaster, TypeMaster,SubTypeMaster, StatusMaster, RequirementMaster, UomMaster, User, BudgetMaster, ItemCodeMaster } = require('../models');


function sendError(res, err) {
    var result = {
        "success": false,
        "error": err
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "count": Number(result)+1,
        "data": result
    };
    return res.json(finalResult);
}

router.post('/unit', (req, res) => {
    return new Promise((resolve, reject) => {
        UnitMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})
router.post('/department', (req, res) => {
    return new Promise((resolve, reject) => {
        DepartmentMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})
router.post('/userRole', (req, res) => {
    return new Promise((resolve, reject) => {
        UserRoleMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/entity', (req, res) => {
    return new Promise((resolve, reject) => {
        EntityMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/division', (req, res) => {
    return new Promise((resolve, reject) => {
        DivisionMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/type', (req, res) => {
    return new Promise((resolve, reject) => {
        TypeMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/subType', (req, res) => {
    return new Promise((resolve, reject) => {
        SubTypeMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/status', (req, res) => {
    return new Promise((resolve, reject) => {
        StatusMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/requirement', (req, res) => {
    return new Promise((resolve, reject) => {
        RequirementMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/uom', (req, res) => {
    return new Promise((resolve, reject) => {
        UomMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/budget', (req, res) => {
    return new Promise((resolve, reject) => {
        BudgetMaster.create(req.body).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})
router.post('/itemCode', (req, res) => {
    return new Promise((resolve, reject) => {
        ItemCodeMaster.count({ where: {deleteStatus: false, itemType: req.body.itemType }  }).then((result)=>{
          let  itemCode;
          let data;
          data = req.body;
           let id=Number(result) +Number(1);
            if(req.body.itemType == 'Capex') {
                itemCode = (Number(result) < 9 )?"CX0000"+id:"CX000"+id;
              
            } else {
                itemCode = (Number(result) < 9 )?"OX0000"+id:"OX000"+id;
            }
            data.itemCode = itemCode
             ItemCodeMaster.create(data).then(function (iresult) {   
                        sendSuccess(res, iresult);
                    }).catch(function (err) {
                        sendError(res, err);
                    });
            }).catch(function (err) {
                sendError(res, err);
            });
        
        // ItemCodeMaster.create(req.body).then(function (result) {
        //         sendSuccess(res, result);
        //     }).catch(function (err) {
        //         sendError(res, err);
            });
   
})

router.get('/unit', (req, res) => {
    return new Promise((resolve, reject) => {
        UnitMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/department', (req, res) => {
    return new Promise((resolve, reject) => {
        DepartmentMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/department/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        DepartmentMaster.findAll({ where: {deleteStatus: false, unitId: req.params.id }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/userRole', (req, res) => {
    return new Promise((resolve, reject) => {
        UserRoleMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/entity', (req, res) => {
    return new Promise((resolve, reject) => {
        EntityMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/division', (req, res) => {
    return new Promise((resolve, reject) => {
        DivisionMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})

router.get('/type', (req, res) => {
    return new Promise((resolve, reject) => {
        TypeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/subType', (req, res) => {
    return new Promise((resolve, reject) => {
        SubTypeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/status', (req, res) => {
    return new Promise((resolve, reject) => {
        StatusMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/uom', (req, res) => {
    return new Promise((resolve, reject) => {
        UomMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/requirement', (req, res) => {
    return new Promise((resolve, reject) => {
        RequirementMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/users', (req, res) => {
    return new Promise((resolve, reject) => {
        User.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/budget', (req, res) => {
    return new Promise((resolve, reject) => {
        BudgetMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})
router.get('/itemCode', (req, res) => {
    return new Promise((resolve, reject) => {
        ItemCodeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


router.get('/mail', (req, res) => {
    return new Promise((resolve, reject) => {
        sendSuccess(res, "success");
    })  
   
})
module.exports = router
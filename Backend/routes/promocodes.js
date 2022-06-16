const router = require('express').Router();
let PromoCode = require('../models/PromoCode.model');

router.route('/').get((req, res) => {
  PromoCode.find()
    .then(promoCodes => res.json(promoCodes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const promocode = req.body.promocode;
  const description = req.body.description;
  //const promoCode = "6DSQW";
  //const description = "My new description.";
  const newPromoCode= new PromoCode({
    promoCode: promoCode,
    description: description,
  });
  console.log(newPromoCode);
  newPromoCode.save()
  .then(() => res.json('PromoCode added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  PromoCode.findById(req.params.id)
    .then(promoCodes => res.json(promoCodes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  PromoCode.findByIdAndDelete(req.params.id)
    .then(() => res.json('PromoCode deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  PromoCode.findById(req.params.id)
    .then(promocode => {
      promocode.username = req.body.promocode;
      promocode.description = req.body.description;
      promocode.save()
        .then(() => res.json('promocode updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
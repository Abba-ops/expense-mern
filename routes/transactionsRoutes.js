const { Router } = require("express");
const router = Router();
const {
  get_transactions,
  post_transaction,
  delete_transaction,
} = require("../controllers/transactionsControllers");

router.route("/").get(get_transactions).post(post_transaction);
router.route("/:id").delete(delete_transaction);

module.exports = router;

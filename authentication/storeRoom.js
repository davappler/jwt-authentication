// You can ignore this file, I am using this as a
// storeRoom for some of my function

/**
 * Adds two numbers together.
 * @param {object} req The request object
 * @param {object} res The response object
 */
async function updateHandler(req, res) {
  const { newUserName, id } = req.body;
  // Verifying if role and id is present

  try {
    const user = await User.findById(id);
    user.username = newUserName;
    user.save();
    res.status(200).json({ message: "Username updated succesfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
}

/**
 * Adds two numbers together.
 * @param {object} req The request object
 * @param {object} res The response object
 */
async function deleteHandler(req, res) {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.deleteOne())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
}

module.exports = {
  updateHandler,
  deleteHandler,
};

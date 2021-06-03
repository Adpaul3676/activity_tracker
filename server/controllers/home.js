module.exports = {
  getActivities: async (req, res) => {
    const db = req.app.get('db');
    // console.log(req.session);
    const userID = req.session.user.id
    const foundActivities = await db.homeScreen.getActivities([userID]);
    return res.status(200).send(foundActivities);
  },

  createActivity: async (req, res) => {
    const db = req.app.get('db');
    const id = req.session.user.id;
    console.log(id);
    const {title} = req.body;
    const newActivities = await db.homeScreen.createActivity([title, id]);
    return res.status(200).send(newActivities);
  },

  deleteActivity: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    // const userID = req.session.user.id;
    const newActivities = await db.homeScreen.deleteActivity([id]);
    return res.status(200).send(newActivities);
  }
}
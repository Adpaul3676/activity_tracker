module.exports = {
  getActivity: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const foundActivity = await db.single.getActivity([id]);
    return res.status(200).send(foundActivity);
  },

  updateActivity: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {title} = req.body;
    const updated = await db.single.updateActivity([id, title])
    return res.status(200).send(updated);
  },

  deleteActivity: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const deleted = await db.single.deleteActivity([id]);
    return res.status(200).send('Deleted')
  }
}
module.exports = {
  getCompleted: async (req, res) => {
    const db = req.app.get('db');
    const completed = await db.completed.getCompleted();
    return res.status(200).send(completed);
  },

  createCompleted: async (req, res) => {
    const db = req.app.get('db');
    const {activity_id, title, user_id} = req.body


    // const timestamp = Date.now();
    // const formatted = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    // console.log(formatted);

    
    const created = await db.completed.createCompleted([activity_id, title, user_id]);
    return res.status(200).send(created);
  },

  removeCompleted: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    await db.completed.removeCompleted([id]);
    return res.status(200);
  }
}
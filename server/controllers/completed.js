module.exports = {
  getCompleted: async (req, res) => {
    const db = req.app.get('db');
    const activity_id = req.query.activity_id;
    // console.log(req.query)
    // console.log(activity_id)
    const completed = await db.completed.getCompleted([activity_id]);
    // console.log(completed);
    // console.log('Here');
    return res.status(200).send(completed);
  },

  toggleCompleted: async (req, res) => {
    const db = req.app.get('db');
    const user_id = req.session.user.id;
    const { activity_id, title, date } = req.body;
    const result = await db.completed.find_completed_by_id([activity_id, date]);
    const foundActivity = result[0];
    if (foundActivity) {
      await db.completed.removeCompleted([activity_id, date]);
      const allPrimary = await db.completed.getCompleted([activity_id]);
      return res.status(200).send(allPrimary);
    }

    // const timestamp = Date.now();
    // const formatted = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    // console.log(formatted);


    await db.completed.createCompleted([activity_id, title, user_id, date]);
    const all = await db.completed.getCompleted([activity_id]);
    return res.status(200).send(all);
  }
}
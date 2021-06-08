module.exports = {
  getCompleted: async (req, res) => {
    const db = req.app.get('db');
    const completed = await db.completed.getCompleted();
    return res.status(200).send(completed);
  },

  toggleCompleted: async (req, res) => {
    const db = req.app.get('db');
    const user_id = req.session.user.id;
    const { activity_id, title, date } = req.body;
    const result = await db.completed.find_completed_by_id([activity_id, date]);
    const foundActivity = result[0];
    const all = await db.completed.getCompleted();
    if (foundActivity) {
      await db.completed.removeCompleted([activity_id, date]);
      return res.status(200).send(all);
    }

    // const timestamp = Date.now();
    // const formatted = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp);
    // console.log(formatted);


    await db.completed.createCompleted([activity_id, title, user_id, date]);
    return res.status(200).send(all);
  }
}
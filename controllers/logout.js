export default async (req, res) => {
    await req.session.destroy();
    res.redirect('/');
}
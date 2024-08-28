import Song from '../models/songModel.js'

const createSong = async (req,res)=>{
    const { title, artist, album, genre } = req.body;
    try {
        if (!title || !artist || !album || !genre) {
            return response.status(400).json({
              success: false,
              message: "send all required fields:title,artist,album,genre ",
            });
          }

        const newSong = new Song({title, artist, album, genre})
        const savedSong = await newSong.save()
        res.json(savedSong);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all songs

const getAllSongs = async (req,res)=>{
 try {
    const allSongs = await Song.find()
    res.status(200).json(allSongs);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
}

 const updateSong = async (req, res) => {
    try {
      const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.status(200).json(song);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const deleteSong = async (req, res) => {
    try {
      const song = await Song.findByIdAndDelete(req.params.id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.status(200).json({ message: 'Song deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const getStatistics = async (req,res)=>{
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = await Song.distinct('artist').then((artists) => artists.length);
        const totalAlbums = await Song.distinct('album').then((album)=>album.length)
        const totalGenres = await Song.distinct('genre').then((genres)=>genres.length)
        const songsInEveryGenres = await Song.aggregate([
          {$group:{_id:"$genre",totalSongs:{$sum:1}}}
        ])
        
        const songsinEachAlbum = await Song.aggregate([
          {$group:{_id:"$album",totalSongs:{$sum:1}}}
        ])

        const songsEachArtistHas = await Song.aggregate([
           {$group:{_id:"$artist",totalSongs:{$sum:1}}}
        ])

       const albumsEachArtistHas = await Song.aggregate([
         {$group:{_id:{artist:"$artist",album:"$album"}}},
         {$group:{_id:"$_id.artist",totalAlbums:{$sum:1},Albums:{$addToSet: "$_id.album"}}}
       ])
        res.status(200).json({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            songsInEveryGenres,
            songsinEachAlbum,
            songsEachArtistHas ,
            albumsEachArtistHas
          });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export {createSong,getAllSongs,updateSong,deleteSong,getStatistics}
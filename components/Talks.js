const Talks = (props) => (
    <div>
        <div>
            <h3>Talks</h3>

            <p>I'm a noob in public speaking. My near term goal is to get a talk accepted in a tech conference.</p>

            <div className="card">
                <p>Get to know the Unicode monster and don't let it harm you</p>
                <div>
                <iframe width="100%" height="300" 
                src="https://www.youtube.com/embed/8fjR4gu2q34?start=146" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
                </div>
                <a href="https://speakerdeck.com/ljcjug/get-to-know-the-unicode-monster-and-dont-let-it-harm-you-jeremy-chan">Speaker Deck</a>
                <div class="text-right">
                    {new Date("2020-09-08").toLocaleDateString()}
                </div>
            </div>

            <div className="card">
                <p>Automating your life with Selenium - Lightning Talk</p>
                <div>
                    <iframe width="100%" height="300" 
                    src="https://www.youtube.com/embed/BfvUmVIcKxk?start=760" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                </div>
                <div class="text-right">
                    {new Date("2020-07-24").toLocaleDateString()}
                </div>
            </div>


        </div>

    </div>
)

export default Talks

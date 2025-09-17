// import { BlogPosts } from "app/components/posts";

const poem = `At one point along the river of time,
I studied the grit of daily life with care,
and searched patiently for the gold of meaning.  
I loved with all I had—
then stripped love of its illusion, down to the biological.
Still, I kept showing up for intimacy, without disappointment.  
I kept asking who I was, and who I wanted to become.
I looked up to greatness, and respected the ordinary.
I thought about power, elites, and service—
and also about mice, cockroaches, and parasites.
I thought—and knew that I was thinking.
I won’t be a writer, or a poet.
I just hope to be a living thing—one that feels existence,
and longs to grow.  
Like geese leave a trace as they pass,
this book gathers the fragments and crystallizations of a life before death—
my small legacy after I’m gone.
Of course, it’ll be buried,lost in the infinite dust of time and space.  
But if one day it’s uncovered,
I hope it holds even a bit of value.
I won’t live to see that future.
The universe is too vast. I’m barely a speck.
And so all I can do
is keep trying to face my own existence with dignity,
to feel it, nourish it, walk with it—
and ride like a knight into the endless night of death.`;

export default function Page() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        Hi&nbsp;,&nbsp;I'm&nbsp;Dufran
      </h1>
      <p className="text-right">{`a programmer, writer, life artist`}</p>
      <div className="my-6" style={{ whiteSpace: "pre-wrap" }}>
        {poem}
        {/* <BlogPosts /> */}
      </div>
    </section>
  );
}

import * as React from 'react';

interface Props {
  learn: Record<string, string>;
  tools: Record<string, string>;
}

export const IndexPage: React.FC<Props> = ({ learn, tools }) => (
  <>
    <article>
      <h1>Why We Visualize Data</h1>
      <p>
        It's really difficult to actually understand how something works if you can't understand why it works.
        Understanding why something works is usually linked to being able to visually inspect various aspects of it.
        This doesn't mean that you can see everything all at once necessarily, but it does mean that you can more fully understand why it works the wasy that it does.
        And with that why it fails when it does fail.

        <figure>
          <div id="ordered-sorts" className="four"></div>
          <figcaption>Steps 1-200 on ordered arrays.</figcaption>
        </figure>
        <figure>
          <div id="reverse-sorts" className="four"></div>
          <figcaption>Steps 1-200 on reversed arrays.</figcaption>
        </figure>
      </p>
      <figure>
        <img src="http://www.sandraandwoo.com/comics/2015-04-08-0673-worse-than-bogo-sort.png" />
        <figcaption>
          <a
            target="_blank"
            href="http://www.sandraandwoo.com/2015/04/08/0673-worse-than-bogo-sort/"
          >
            Sandra and Woo
          </a>
        </figcaption>
      </figure>
    </article>
    <article>
      <h3>Tools</h3>
      <ul>
        {Object.entries(tools).map(([name, url]) => (
          <a href={url} target="_top" key={name}>
            <li>{name}</li>
          </a>
        ))}
      </ul>
      <h3>Learn More</h3>
      <ul>
        {Object.entries(learn).map(([name, url]) => (
          <a href={url} target="_blank" key={name}>
            <li>{name}</li>
          </a>
        ))}
      </ul>
    </article>
  </>
);

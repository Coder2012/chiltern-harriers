function Contact() {
  return (
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold text-amber-400 mb-3">Contact</h1>
      <p className="text-slate-300 text-lg mb-2">
        Got a question, spotted an error in the results, or just want to say hello?
      </p>
      <p className="text-slate-500 text-sm mb-8 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
        This form is not currently wired up — messages won't be sent yet. We're working on it.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        aria-label="Contact form"
        noValidate
      >
        <div className="mb-5">
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
            placeholder="Your name"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            required
            aria-required="true"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400"
            placeholder="What's this about?"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            aria-required="true"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 resize-y"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="rounded-lg bg-amber-400/20 border border-amber-400/30 px-6 py-2.5 text-sm font-semibold text-amber-400/60 cursor-not-allowed"
        >
          Send message (coming soon)
        </button>
      </form>
    </div>
  );
}

export default Contact;

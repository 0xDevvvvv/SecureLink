

export default function About() {
  return (
    <div id="about" className="p-6 transition-all ease-in-out bg-white rounded-xl shadow my-10 max-w-3xl mx-auto text-gray-700 leading-relaxed">
    <h2 className="text-2xl font-bold text-red-700 mb-4">About SecureLink</h2>
    <p className="mb-4">
        <strong>SecureLink</strong> is a privacy-focused platform designed to share sensitive information securely and temporarily. Whether it's credentials, personal notes, or private messages, SecureLink ensures that your data is encrypted, stored briefly, and can be accessed only once — making it ideal for one-time sharing.
    </p>
    <p className="mb-4">
        Secrets are protected using modern encryption techniques and automatically expire after a defined period, ensuring they don’t linger unnecessarily in storage. You get a ID you can share, and once the recipient views it, the data is gone — just like a disappearing message.
    </p>
    <p className="mb-4">
        This project was built using <span className="font-medium">Golang (backend)</span> and <span className="font-medium">React (frontend)</span>, with a focus on simplicity, security, and real-world use cases.
    </p>
    <p>
        Whether you're sharing sensitive API tokens or just want your private messages to self-destruct, SecureLink gives you peace of mind.
    </p>
    </div>

  )
}

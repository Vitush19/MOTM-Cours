package io.takima.demo.mail

import java.util.*
import javax.persistence.*

/**
 *
 */
@Entity(name = "mails")

data class Mail(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "note") var note: Int?,
        @Column(name = "comment") var comment: String?,
        @Column(name = "date")  var date: Date?,
        @Column(name = "mail") var mail: String?)
{
    constructor() : this(null, null, null, null, null)
}
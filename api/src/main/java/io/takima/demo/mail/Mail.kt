package io.takima.demo.mail

import io.takima.demo.User
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
        @ManyToOne(optional = false, fetch = FetchType.LAZY)
        @JoinColumn(name = "user")
        var user: User
        ) {
    constructor() : this(null, null, null, User()) //

}
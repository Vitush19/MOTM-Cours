package io.takima.demo.mail

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import io.takima.demo.entites.User
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
        @Column(name = "mail") var mail: String?,
        @JsonBackReference
        @ManyToOne(optional = false, fetch = FetchType.LAZY)
        var user: User
        )
{
    constructor() : this(null, null, null, null, null, User())
}
//        @ManyToOne(optional = false, fetch = FetchType.LAZY)
//        @JoinColumn(name = "user")
//        var user: User